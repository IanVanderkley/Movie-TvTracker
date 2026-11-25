interface id{
    id:number
}


export default function AddToWatchlistButton({id}:id) {


    function addToHandler() {
        alert("Added to Watchlist")
    }
    return(
        <div>
            <button onClick={addToHandler}>Add to Watchlist</button>
        </div>
    )
}