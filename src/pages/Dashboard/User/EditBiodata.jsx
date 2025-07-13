import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const EditBiodata = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch existing biodata for logged-in user
  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the imageFile input for changes
  const imageFile = watch("imageFile");

  // Populate form values if biodata exists
  useEffect(() => {
    if (biodata) {
      Object.keys(biodata).forEach((key) => {
        if (key !== "_id") setValue(key, biodata[key]);
      });
    }
  }, [biodata, setValue]);

  // ImgBB API key (replace with your own)
  const imgbbApiKey = import.meta.env.VITE_image_upload_key;

  const onSubmit = async (data) => {
    try {
      data.email = user?.email;

      // If user uploads a new image file, upload it to ImgBB
      if (data.imageFile && data.imageFile.length > 0) {
        const formData = new FormData();
        formData.append("image", data.imageFile[0]);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await res.json();

        if (result.success) {
          data.image = result.data.url; // Use uploaded image URL
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Remove imageFile before sending to backend
      delete data.imageFile;

      await axiosSecure.put("/biodatas", data);

      Swal.fire("Success", "Biodata saved successfully!", "success");
      queryClient.invalidateQueries(["biodata", user?.email]);
      navigate("/dashboard/view-biodata");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-center text-[#C2185B] mb-6">
        {biodata ? "Edit" : "Create"} Your Biodata
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Biodata Type */}
        <div>
          <label className="block font-semibold">Biodata Type</label>
          <select
            {...register("biodataType", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.biodataType && <p className="text-red-500">Required</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500">Required</p>}
        </div>

        {/* Profile Image Link (manual) */}
        <div>
          <label className="block font-semibold">
            Profile Image Link (or upload below)
          </label>
          <input
            type="url"
            {...register("image")}
            placeholder="Enter image URL"
            className="input input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500">
              Please enter valid URL or upload file
            </p>
          )}
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block font-semibold">Or Upload Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("imageFile")}
            className="file-input file-input-bordered w-full"
          />
          {imageFile && imageFile.length > 0 && (
            <p className="mt-1 text-green-600 text-sm">
              Image file selected: {imageFile[0].name}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-semibold">Date of Birth</label>
          <input
            type="date"
            {...register("dob", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.dob && <p className="text-red-500">Required</p>}
        </div>

        {/* Height */}
        <div>
          <label className="block font-semibold">Height</label>
          <select
            {...register("height", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="5'0">5'0</option>
            <option value="5'5">5'5</option>
            <option value="6'0">6'0</option>
          </select>
          {errors.height && <p className="text-red-500">Required</p>}
        </div>

        {/* Weight */}
        <div>
          <label className="block font-semibold">Weight</label>
          <select
            {...register("weight", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="50kg">50kg</option>
            <option value="60kg">60kg</option>
            <option value="70kg">70kg</option>
          </select>
          {errors.weight && <p className="text-red-500">Required</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold">Age</label>
          <input
            type="number"
            {...register("age", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.age && <p className="text-red-500">Required</p>}
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-semibold">Occupation</label>
          <select
            {...register("occupation", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="Engineer">Engineer</option>
            <option value="Teacher">Teacher</option>
            <option value="Doctor">Doctor</option>
          </select>
          {errors.occupation && <p className="text-red-500">Required</p>}
        </div>

        {/* Race */}
        <div>
          <label className="block font-semibold">Race</label>
          <select
            {...register("race", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="Fair">Fair</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
          {errors.race && <p className="text-red-500">Required</p>}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block font-semibold">Father's Name</label>
          <input
            type="text"
            {...register("fatherName", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.fatherName && <p className="text-red-500">Required</p>}
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block font-semibold">Mother's Name</label>
          <input
            type="text"
            {...register("motherName", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.motherName && <p className="text-red-500">Required</p>}
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block font-semibold">Permanent Division</label>
          <select
            {...register("permanentDivision", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
          {errors.permanentDivision && <p className="text-red-500">Required</p>}
        </div>

        {/* Present Division */}
        <div>
          <label className="block font-semibold">Present Division</label>
          <select
            {...register("presentDivision", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
          {errors.presentDivision && <p className="text-red-500">Required</p>}
        </div>

        {/* Expected Partner Age */}
        <div>
          <label className="block font-semibold">Expected Partner Age</label>
          <input
            type="number"
            {...register("expectedPartnerAge", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.expectedPartnerAge && (
            <p className="text-red-500">Required</p>
          )}
        </div>

        {/* Expected Partner Height */}
        <div>
          <label className="block font-semibold">Expected Partner Height</label>
          <select
            {...register("expectedPartnerHeight", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="5'0">5'0</option>
            <option value="5'5">5'5</option>
            <option value="6'0">6'0</option>
          </select>
          {errors.expectedPartnerHeight && (
            <p className="text-red-500">Required</p>
          )}
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block font-semibold">Expected Partner Weight</label>
          <select
            {...register("expectedPartnerWeight", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            <option value="50kg">50kg</option>
            <option value="60kg">60kg</option>
            <option value="70kg">70kg</option>
          </select>
          {errors.expectedPartnerWeight && (
            <p className="text-red-500">Required</p>
          )}
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-semibold">Mobile Number</label>
          <input
            type="text"
            {...register("mobile", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.mobile && <p className="text-red-500">Required</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#C2185B] hover:bg-[#8E44AD] text-white font-bold py-3 rounded-lg"
          >
            Save & Publish Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
