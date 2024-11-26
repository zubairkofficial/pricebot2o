import React from "react";

const SummaryFormatter = ({ summary }) => {
  const renderFormattedSummary = () => {
    try {
      // If summary is in JSON format
      const parsedSummary = JSON.parse(summary);

      return Object.entries(parsedSummary).map(([key, value], index) => (
        <div key={index} className="mb-4">
          <h6 className="font-semibold text-md mb-2">{key}:</h6>{" "}
          {/* Apply font-semibold for bold */}
          <p className="text-sm">{value}</p>
        </div>
      ));
    } catch {
      // Handle plain text summary dynamically
      const sections = summary.split("\n").filter((line) => line.trim() !== ""); // Remove empty lines

      return sections.map((line, index) => {
        // Detect bold markers like ** and format as heading
        const isBold = line.startsWith("**") && line.endsWith("**");
        const cleanLine = line.replace(/\*\*/g, ""); // Remove ** markers

        // Detect bullet points or lists
        const isBullet =
          line.trim().startsWith("-") || line.trim().startsWith("*");

        return isBold ? (
          <h6 key={index} className="font-semibold text-md mt-4 mb-2">
            {" "}
            {/* Added font-semibold for bold */}
            {cleanLine}
          </h6>
        ) : isBullet ? (
          <li key={index} className="text-sm mb-1">
            {line}
          </li>
        ) : (
          <p key={index} className="text-sm mb-2">
            {line}
          </p>
        );
      });
    }
  };

  return (
    <div className="mb-4">
      <div className="bg-gray-100 p-4 rounded">{renderFormattedSummary()}</div>
    </div>
  );
};

export default SummaryFormatter;
