import React from "react";

const KYCBanner: React.FC<{ verified: boolean }> = ({ verified }) => {
  if (verified)
    return (
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-lg shadow-md flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <div>
          <p className="font-bold">KYC Verified</p>
          <p className="text-sm opacity-90">
            Your account is fully verified. All features unlocked.
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 p-4 rounded-lg shadow-md flex items-center gap-3">
      <span className="text-2xl">⚠️</span>
      <div>
        <p className="font-bold">KYC Verification Pending</p>
        <p className="text-sm">Complete verification to unlock all features</p>
      </div>
    </div>
  );
};

export default KYCBanner;
