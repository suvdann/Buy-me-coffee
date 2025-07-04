import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CreateProfileHeader } from "./_components/CreateProfileHeader";
import { CompleteProfileForm } from "./_components/CompleteProfileForm";

const CreateProfilePage = () => {
  return (
    <div className="flex flex-col">
      <div>
        <CreateProfileHeader />
      </div>

      <div>
        <CompleteProfileForm />
      </div>
    </div>
  );
};
export default CreateProfilePage;
