
interface id {
    id:number
}

export default function CreateReviewButton({id}:id) {

    function createReviewHandler() {
        alert("Created Review")
    }
    return(
        <div>
            <button onClick={createReviewHandler}>Create Review</button>
        </div>
    )
}