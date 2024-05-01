"use client";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const navigateToViewer = () => {
    router.push("/viewer");
  };

  const navigateToOrganize = () => {
    router.push("/organize");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="py-4 px-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Your Dashboard</h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl w-full px-4 py-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="block bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:bg-gray-100 transition duration-300"
              onClick={navigateToViewer}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                View & Edit PDFs
              </h2>
              <p className="text-gray-600">
                Access and edit your PDFs in a seamless environment.
              </p>
            </div>

            <div
              className="block bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:bg-gray-100 transition duration-300"
              onClick={navigateToOrganize}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Organize Documents
              </h2>
              <p className="text-gray-600">
                Organize, categorize, and manage your PDF collection
                effortlessly.
              </p>
            </div>

            {/* Add more sections or features as needed */}
          </section>
        </div>
      </main>

      <footer className="py-4 text-gray-600">
        © 2023 PDF.ai. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardPage;
