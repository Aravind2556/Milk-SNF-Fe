import React, { useEffect, useState } from "react";
import LiveChart from "./LiveChart";

export const NewDashboard = () => {
  const [Thigh, setThigh] = useState(null);
  const [Shin, setShin] = useState(null);
  const [Foot, setFoot] = useState(null);
  const [EMG, SetEMG] = useState(null);


  const controls = {
    show: true,
    download: true,
    selection: false,
    zoom: false,
    zoomin: true,
    zoomout: true,
    pan: true,
    reset: true,
    zoomEnabled: true,
    autoSelected: "zoom",
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.thingspeak.com/channels/2860072/feeds.json?api_key=OMHJTCKP4MNKXR8L";

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched Data:", data);

        if (data?.feeds?.length > 0) {
          const xAxis = data.feeds.map((feed) => new Date(feed.created_at).getTime());

          setThigh({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field1),
            color: "green",
            seriesName: "Thigh",
          });

          setShin({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field2),
            color: "blue",
            seriesName: "Shin",
          });

          setFoot({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field3),
            color: "#ff4f4f",
            seriesName: "Foot",
          });
          SetEMG({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field4),
            color: "#ff4f4f",
            seriesName: "EMG",
          });
          
        }
      } catch (error) {
        console.error("Error fetching data from ThingSpeak:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!Thigh || !Shin || !Foot || !EMG ) {
    return <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">
      Gait Analysis 
      </h1>

      {/* Charts Section */}
      <div className=" flex-wrap flex justify-center gap-20">
        {/* Combined Chart */}
        <div className="flex justify-center">
        <div className="bg-cyan-100 w-[350px] sm:w-[600px]  shadow-lg rounded-lg p-5">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">THIGH</h2>
          <LiveChart
            data={[Thigh]}
            title="Combined Chart"
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* LightingValue Chart */}
        <div className="flex justify-center">
        <div className="bg-cyan-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">SHIN</h2>
          <LiveChart
            data={[Shin]}
            title={Shin.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* Spark Chart */}
        <div className="flex justify-center">
        <div className="bg-cyan-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">FOOT</h2>
          <LiveChart
            data={[Foot]}
            title={Foot.seriesName}
            lineStyle="smooth"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* Current Chart */}
        <div className="flex justify-center">
        <div className="bg-cyan-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5 ">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">EMG</h2>
          <LiveChart
            data={[EMG]}
            title={EMG.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
            
          />
        </div>
        </div>

                
            

      </div>
    </div>
  );
};



