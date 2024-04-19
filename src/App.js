import React, { useReducer } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
};

function bankAccountReducer(state, action) {
    if (!state.isActive && action.type !== "openAccount") {
        return state;
    }
    switch (action.type) {
        case "openAccount":
            return { ...state, isActive: true, balance: 500 };
        case "deposit":
            return { ...state, balance: state.balance + action.amount };
        case "withdraw":
            return { ...state, balance: state.balance - action.amount };
        case "requestLoan":
            if (state.loan === 0) {
                return {
                    ...state,
                    balance: state.balance + action.amount,
                    loan: action.amount,
                };
            }
            return state;
        case "payLoan":
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
            };
        case "closeAccount":
            if (state.loan === 0 && state.balance === 0) {
                return { ...initialState };
            }
            return state;
        default:
            return state;
    }
}

export default function App() {
    const [{ balance, loan }, dispatch] = useReducer(
        bankAccountReducer,
        initialState
    );
    return (
        <div className="App">
            <h1>useReducer Bank Account</h1>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>

            <p>
                <button
                    onClick={() => dispatch({ type: "openAccount" })}
                    disabled={false}
                >
                    Open account
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "deposit", amount: 150 })}
                    disabled={false}
                >
                    Deposit 150
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "withdraw", amount: 50 })}
                    disabled={false}
                >
                    Withdraw 50
                </button>
            </p>
            <p>
                <button
                    onClick={() =>
                        dispatch({ type: "requestLoan", amount: 5000 })
                    }
                    disabled={false}
                >
                    Request a loan of 5000
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "payLoan" })}
                    disabled={false}
                >
                    Pay loan
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: "closeAccount" })}
                    disabled={false}
                >
                    Close account
                </button>
            </p>
        </div>
    );
}
