import SearchForm from "../components/SearchForm";
import Calendar from "../components/Calendar"
import Button from '@mui/material/Button';


const Home = () => {
    return(
        <>
            <SearchForm />
            <Calendar />
            <Button variant="contained">Order Ticket</Button>
        </>
    )
}


export default Home