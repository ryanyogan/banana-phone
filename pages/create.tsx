import axios from "axios";
import ListingForm from "components/BananaForm";
import Layout from "components/Layout";

const Create = () => {
  const addRing = (data: any) => axios.post("/api/rings", data);

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-lg">Ring, Ring, Ring...</h1>
        <p className="text-gray-500">
          Banana Phone! Show everyone really quickly what is happening!
        </p>
        <div className="mt-8">
          <ListingForm
            buttonText="Share the bannana"
            redirectPath="/"
            onSubmit={addRing}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Create;
