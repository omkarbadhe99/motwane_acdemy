"use client";

export default function ProfilePage() {
  return (
    <>
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white  rounded-lg  flex flex-col items-center">
            <div className="mx-10 p-10 bg-[#F8FAFC] flex flex-col rounded-xl items-center shadow-xs">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />

              <h2 className="text-lg font-semibold mt-4">Omkar Badhe</h2>

              <p className="text-gray-600 text-sm mt-1">omkar@example.com</p>
              <p className="text-gray-600 text-sm mt-1">+91 9876543210</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border rounded-lg p-6 space-y-8">
            {/* MAIN PROFILE FORM */}
            <form className="space-y-6">
              {/* FIRST & LAST NAME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* EMAIL + MOBILE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  placeholder="******"
                />
              </div>

              <div className="flex flex-col">
                <button
                  type="submit"
                  className="bg-[#0D6CB3] hover:bg-[#0B5C98] text-white px-6 py-2 rounded-md self-end text-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>

            {/* ------------------ IMAGE UPLOAD SECTION ------------------ */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Profile Image</h4>

              {/* IMAGE PREVIEW BOX */}
              <div className="w-full h-48 bg-gray-100 border rounded-lg flex items-center justify-center">
                <img
                  src="/avatar-placeholder.png"
                  alt="Preview"
                  className="h-full object-cover rounded-lg"
                />
              </div>

              {/* UPLOAD IMAGE ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Add / Change Image
                  </label>
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>

                <button
                  type="button"
                  className="text-xs border border-black text-black px-4 py-2 rounded-md h-fit bg-transparent hover:bg-black hover:text-white transition"
                >
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
