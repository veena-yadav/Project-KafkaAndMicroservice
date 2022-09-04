import React from "react";
import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminForm from "../components/adminlogin";


test('login test', () => { 
    render(<AdminForm/>)
    // const email = screen.getByTestId("usertest")
    // const password = screen.getByTestId("passwordtest")
    const btn =screen.getByRole("button", {name:/login/i})

    userEvent.click(btn)
    expect(btn).toBeInTheDocument()

})
