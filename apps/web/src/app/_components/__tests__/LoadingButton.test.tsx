import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoadingButton from "../LoadingButton";

describe("LoadingButton", () => {
  it("renders children correctly", () => {
    render(<LoadingButton>Click Me</LoadingButton>);
    expect(screen.getByRole("button", { name: "Click Me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<LoadingButton onClick={handleClick}>Click Me</LoadingButton>);
    
    fireEvent.click(screen.getByRole("button", { name: "Click Me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when loading is true", () => {
    render(<LoadingButton loading>Click Me</LoadingButton>);
    
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-60");
  });

  it("displays loading text when provided", () => {
    render(<LoadingButton loading loadingText="Submitting...">Submit</LoadingButton>);
    
    expect(screen.getByText("Submitting...")).toBeInTheDocument();
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();
  });

  it("does not call onClick when loading", () => {
    const handleClick = vi.fn();
    render(<LoadingButton loading onClick={handleClick}>Click Me</LoadingButton>);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
