import { Suspense } from "react";
import Resources from "../components/resources/ResourcesPage";

const ResourcesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Resources />
    </Suspense>
  );
};

export default ResourcesPage;
