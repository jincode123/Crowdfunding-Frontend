import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser.js";

function CreateFundraiserForm() {
    const navigate = useNavigate();
    const [fundraiser, setFundraiser] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: true
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFundraiser((prevFundraiser) => ({
            ...prevFundraiser,
            [id]: id==="goal" ? Number(value) : value,
        }));
    };
    
    const handleSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        try{
            new URL(fundraiser.image);
        } catch {
            alert("Invalid image URL");
            return;
        }
        if (fundraiser.title && fundraiser.description && fundraiser.goal && fundraiser.image && fundraiser.is_open) {
            postFundraiser(
                fundraiser.title,
                fundraiser.description,
                Number(fundraiser.goal),
                fundraiser.image,
                fundraiser.is_open
            ).then((response) => {
                console.log(response);
                navigate("/");
            });
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="goal">Goal:</label>
            <input
                    type="number"
                    id="goal"
                    placeholder="Enter goal"
                    onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="image">Image URL:</label>
            <input
                    type="text"
                    id="image"
                    placeholder="Enter image URL"
                    onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="is_open">Is Open:</label>
            <input
                    type="checkbox"
                    id="is_open"
                    checked={fundraiser.is_open}
                    onChange={handleChange}
            />
        </div>
        <button type="submit">
                Create Fundraiser
        </button>
        </form>
    );
    }

    export default CreateFundraiserForm;