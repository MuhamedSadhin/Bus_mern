import React from 'react'

const BookedSeats = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="overflow-x-auto w-[900px]">
          <table className="table">
            <caption className="font-bold">Connections</caption>
            {/* Table Head */}

            <tbody>
              {/* Render connections dynamically */}
              {connections && connections.length > 0 ? (
                connections.map((connection) => (
                  <tr key={connection._id}>
                    <td>
                      <div className="flex items-center gap-3 m-5">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16">
                            <img
                              src={
                                connection.photoUrl ||
                                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                              }
                              alt={`${connection.firstName} ${connection.lastName}`}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            <span>{`${connection.firstName} ${connection.lastName}`}</span>
                          </div>
                          <div className="text-sm opacity-50">
                            {connection.gender || "Unknown"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {connection.about}
                      <br />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No connections found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookedSeats
