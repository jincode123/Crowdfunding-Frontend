import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import CreateFundraiser from "./CreateFundraiser";  
import "../styles/pages/HomePage.css";
import "../styles/components/NavBar.css";

function HomePage() {
    const { fundraisers } = useFundraisers();  
    return (
        <>
            <h1> Total Pledges</h1>
            <div id="fundraiser-list">
                {fundraisers.map((fundraiserData, key) => {
                    return <FundraiserCard key={key} fundraiserData={fundraiserData}/>;
                })}
            </div>
            
        </>
    );
}

export default HomePage;