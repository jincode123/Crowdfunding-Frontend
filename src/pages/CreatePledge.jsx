import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import CreatePledgeForm from "../components/CreatePledgeForm.jsx";

function CreatePledge() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    // If user is not authenticated, show login message
    if (!auth.token) {
        return (
            <div>
                <h2>Create Pledge</h2>
                <p>You must be logged in to make a pledge.</p>
                <button onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>Create Pledge</h2>
            <CreatePledgeForm />
        </div>
    );
}

export default CreatePledge;
