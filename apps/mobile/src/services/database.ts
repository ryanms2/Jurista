// ============================================
// SQLite Database Service
// ============================================
// Banco de dados local para funcionamento offline
// Espelha as tabelas principais do PostgreSQL
// ============================================

import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Obter instância do banco de dados SQLite
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  db = await SQLite.openDatabaseAsync("jurista.db");

  // Habilitar WAL mode para melhor performance
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync("PRAGMA foreign_keys = ON;");

  // Criar tabelas
  await initializeSchema(db);

  return db;
}

/**
 * Inicializar schema do banco local
 */
async function initializeSchema(database: SQLite.SQLiteDatabase) {
  await database.execAsync(`
    -- Clientes
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      rg TEXT NOT NULL,
      address TEXT NOT NULL,
      phone1 TEXT NOT NULL,
      phone2 TEXT,
      credit_score INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Fotos dos clientes
    CREATE TABLE IF NOT EXISTS client_photos (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL,
      local_path TEXT,
      remote_url TEXT,
      type TEXT NOT NULL,
      description TEXT,
      uploaded INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    );

    -- Empréstimos
    CREATE TABLE IF NOT EXISTS loans (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL,
      collector_id TEXT NOT NULL,
      amount REAL NOT NULL,
      interest_rate REAL NOT NULL,
      total_with_interest REAL NOT NULL,
      frequency TEXT NOT NULL,
      total_installments INTEGER NOT NULL,
      installment_amount REAL NOT NULL,
      status TEXT DEFAULT 'ACTIVE',
      commission_pct REAL NOT NULL,
      commission_amount REAL NOT NULL,
      late_fee_amount REAL DEFAULT 10,
      late_fee_days INTEGER DEFAULT 5,
      start_date TEXT NOT NULL,
      end_date TEXT,
      previous_loan_id TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (collector_id) REFERENCES users(id)
    );

    -- Parcelas
    CREATE TABLE IF NOT EXISTS installments (
      id TEXT PRIMARY KEY,
      loan_id TEXT NOT NULL,
      installment_no INTEGER NOT NULL,
      amount REAL NOT NULL,
      late_fee REAL DEFAULT 0,
      total_due REAL NOT NULL,
      due_date TEXT NOT NULL,
      status TEXT DEFAULT 'PENDING',
      paid_amount REAL DEFAULT 0,
      paid_at TEXT,
      days_overdue INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE
    );

    -- Pagamentos
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      installment_id TEXT NOT NULL,
      collector_id TEXT NOT NULL,
      amount REAL NOT NULL,
      method TEXT NOT NULL,
      received_at TEXT DEFAULT (datetime('now')),
      notes TEXT,
      sync_id TEXT UNIQUE,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (installment_id) REFERENCES installments(id),
      FOREIGN KEY (collector_id) REFERENCES users(id)
    );

    -- Movimentações do caixa
    CREATE TABLE IF NOT EXISTS cash_movements (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      payment_id TEXT UNIQUE,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      date TEXT DEFAULT (datetime('now')),
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (payment_id) REFERENCES payments(id)
    );

    -- Usuários (espelho parcial, só dados necessários)
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL,
      phone TEXT,
      commission_pct REAL,
      active INTEGER DEFAULT 1
    );

    -- Fila de sincronização (Outbox)
    CREATE TABLE IF NOT EXISTS sync_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      action TEXT NOT NULL,
      payload TEXT NOT NULL,
      sync_id TEXT UNIQUE NOT NULL,
      synced INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 0,
      last_error TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      synced_at TEXT
    );

    -- Configurações do sistema
    CREATE TABLE IF NOT EXISTS system_configs (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    -- Metadata de sync
    CREATE TABLE IF NOT EXISTS sync_metadata (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    -- Índices
    CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
    CREATE INDEX IF NOT EXISTS idx_clients_cpf ON clients(cpf);
    CREATE INDEX IF NOT EXISTS idx_loans_client ON loans(client_id);
    CREATE INDEX IF NOT EXISTS idx_loans_collector ON loans(collector_id);
    CREATE INDEX IF NOT EXISTS idx_loans_status ON loans(status);
    CREATE INDEX IF NOT EXISTS idx_installments_loan ON installments(loan_id);
    CREATE INDEX IF NOT EXISTS idx_installments_status ON installments(status);
    CREATE INDEX IF NOT EXISTS idx_installments_due ON installments(due_date);
    CREATE INDEX IF NOT EXISTS idx_payments_installment ON payments(installment_id);
    CREATE INDEX IF NOT EXISTS idx_sync_queue_synced ON sync_queue(synced);
  `);
}

/**
 * Fechar banco de dados
 */
export async function closeDatabase() {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
