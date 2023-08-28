import Result from "antd/lib/result";

export const NotFoungPage = () => {
    return (
        <>
            <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                />
            <h1>Lost in space</h1>
            <p>Looks, you are lost, this space does not exist</p>
        </>
    )
}