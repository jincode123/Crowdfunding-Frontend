import { oneFundraiser } from "../data";
import { useParams, Link } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import { useAuth } from "../hooks/use-auth";


function FundraiserPage() {
  // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useFundraiser hook. 
  const { id } = useParams();
  const { auth } = useAuth();
  // useFundraiser returns three pieces of info, so we need to grab them all here
  const { fundraiser, isLoading, error } = useFundraiser(id); 
  if (isLoading) {
    return (<p>loading...</p>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
  return (
    <div>
        <h2>{fundraiser.title}</h2>
        <h3>Created at: {fundraiser.date_created}</h3>
        <h3>{`Status: ${fundraiser.is_open}`}</h3>
        
        {/* Show pledge button only if fundraiser is open and user is authenticated */}
        {fundraiser.is_open && auth.token && (
            <div style={{ margin: "20px 0" }}>
                <Link to={`/fundraiser/${id}/pledge`}>
                    <button style={{ 
                        backgroundColor: "#4CAF50", 
                        color: "white", 
                        padding: "10px 20px", 
                        border: "none", 
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}>
                        Make a Pledge
                    </button>
                </Link>
            </div>
        )}
        
        {/* Show message if user is not logged in */}
        {fundraiser.is_open && !auth.token && (
            <div style={{ margin: "20px 0" }}>
                <p style={{ color: "#666" }}>
                    <Link to="/login">Log in</Link> to make a pledge to this fundraiser.
                </p>
            </div>
        )}
        
        <h3>Pledges:</h3>
        <ul>
            {fundraiser.pledges.map((pledgeData, key) => {
                return(
                    <li key={key}>
                        {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                );
            })}
        </ul>
    </div>
  );
}


export default FundraiserPage;