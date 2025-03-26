import React, { useEffect, useState } from "react";
import LiveChart from "./LiveChart";

export const NewDashboard = () => {
  const [Red, setRed] = useState(null);
  const [Green, setGreen] = useState(null);
  const [Blue, setBlue] = useState(null);
  const [Frequency, SetFrequency] = useState(null);
  const [Snf,SetSnf] = useState(null)


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
        "https://api.thingspeak.com/channels/2883257/feeds.json?api_key=ZX1MOBSY1M99ZXBG";

            

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched Data:", data);

        if (data?.feeds?.length > 0) {
          const xAxis = data.feeds.map((feed) => new Date(feed.created_at).getTime());

          setRed({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field1),
            color: "red",
            seriesName: "Red",
          });

          setGreen({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field2),
            color: "green",
            seriesName: "Green",
          });

          setBlue({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field3),
            color: "blue",
            seriesName: "Blue",
          });
          SetFrequency({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field4),
            color: "#ff4f4f",
            seriesName: "Output Freq",
          });
          SetSnf({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field5),
            color: "#ff4f4f",
            seriesName: "Snf",
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

  if (!Red || !Green || !Blue || ! Frequency || !Snf) {
    return <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>;
  }

  return (
    <div className="container-fluid p-0 mx-auto mt-10 ">
      <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">
      Milk Snf & Adulteration Monitoring System 
      </h1>

      {/* Charts Section */}
      <div className=" flex-wrap flex justify-center gap-5 mt-5">
        {/* Combined Chart */}
        <div className="flex justify-center col-11 col-md-8 col-lg-5">
        <div className="bg-amber-50  w-100  shadow-lg rounded-lg pt-3 pb-2 px-2">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Red</h2>
          <LiveChart
            data={[Red]}
            title="Red"
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* LightingValue Chart */}
        <div className="flex justify-center col-11 col-md-8 col-lg-5">
        <div className="bg-amber-50  w-100 shadow-lg rounded-lg pt-3 pb-2 px-2">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Green</h2>
          <LiveChart
            data={[Green]}
            title={Green.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* Spark Chart */}
        <div className="flex justify-center col-11 col-md-8 col-lg-5">
        <div className="bg-amber-50  w-100 shadow-lg rounded-lg pt-3 pb-2 px-2">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Blue</h2>
          <LiveChart
            data={[Blue]}
            title={Blue.seriesName}
            lineStyle="smooth"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
        </div>


        {/* Current Chart */}
        <div className="flex justify-center col-11 col-md-8 col-lg-5">
        <div className="bg-amber-50  w-100 shadow-lg rounded-lg pt-3 pb-2 px-2 ">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Frequency</h2>
          <LiveChart
            data={[ Frequency]}
            title={ Frequency.seriesName}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
            
          />
        </div>
        </div>  

            {/* Current Chart */}
                <div className="flex justify-center col-11 col-md-8 col-lg-5">
        <div className="bg-amber-50  w-100 shadow-lg rounded-lg pt-3 pb-2 px-2 ">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Snf</h2>
          <LiveChart
            data={[Snf]}
            title={Snf.seriesName}
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



