import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Apipath";

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/enroll/get/id`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEnrollments(data.data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading enrollments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10">
        <h1 className="text-3xl font-black mb-8 text-center">
          My Enrollments
        </h1>

        {enrollments.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not enrolled in any course yet.
          </p>
        ) : (
          <div className="space-y-6">
            {enrollments.map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-indigo-600">
                  {item.course}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Enrolled on:{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentList;
