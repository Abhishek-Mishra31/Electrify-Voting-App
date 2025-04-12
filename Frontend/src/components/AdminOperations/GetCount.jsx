import { React, useContext, useEffect } from "react";
import voteContext from "../../Context/vote/Votecontext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#0088FE", "#AF19FF"];

const GetCount = () => {
  const context = useContext(voteContext);
  const { getCount, votes } = context;

  useEffect(() => {
    getCount();
  });

  return (
    <>
      <section className="my-20 bg-gray-800 text-white py-10 px-4 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-10">
          Live Poll Results
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="w-full lg:w-1/2 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={votes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="voteCount"
                  nameKey="party"
                >
                  {votes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/2 bg-gray-700 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Party-wise Votes
            </h3>
            <div className="space-y-4">
              {votes.map((vote, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 px-3 bg-gray-600 rounded-md"
                >
                  <span className="font-medium">{vote.party}</span>
                  <span className="font-bold text-cyan-400">
                    {vote.voteCount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetCount;
