import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postPledge from "../api/post-pledge.js";

function CreatePledgeForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get fundraiser ID from URL
    
    const [pledge, setPledge] = useState({
        amount: "",
        comment: "",
        anonymous: false
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: type === "checkbox" ? checked : (id === "amount" ? Number(value) : value),
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        
        // Validation
        if (!pledge.amount || pledge.amount <= 0) {
            setError("Please enter a valid pledge amount");
            return;
        }
        
        setIsLoading(true);
        
        try {
            await postPledge(
                pledge.amount,
                pledge.comment,
                pledge.anonymous,
                Number(id) // fundraiser ID from URL params
            );
            
            // Redirect back to the fundraiser page after successful pledge
            navigate(`/fundraiser/${id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="amount">Pledge Amount ($):</label>
                    <input
                        type="number"
                        id="amount"
                        min="1"
                        step="0.01"
                        placeholder="Enter pledge amount"
                        value={pledge.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="comment">Comment (optional):</label>
                    <textarea
                        id="comment"
                        placeholder="Leave a comment about your pledge"
                        value={pledge.comment}
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                    />
                </div>
                
                <div>
                    <label htmlFor="anonymous">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={pledge.anonymous}
                            onChange={handleChange}
                        />
                        Make this pledge anonymous
                    </label>
                </div>
                
                <div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Pledge..." : "Create Pledge"}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate(`/fundraiser/${id}`)}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePledgeForm;
