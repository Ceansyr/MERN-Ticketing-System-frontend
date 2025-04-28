import { useState, useCallback, useEffect } from "react";
import { getAvailability, saveAvailability } from "../api/availabilityApi";

export function useAvailability(userId) {
  const [availabilityData, setAvailabilityData] = useState({
    availability: [
      { day: "Sunday", unavailable: true, slots: [] },
      { day: "Monday", unavailable: false, slots: [] },
      { day: "Tuesday", unavailable: false, slots: [] },
      { day: "Wednesday", unavailable: false, slots: [] },
      { day: "Thursday", unavailable: false, slots: [] },
      { day: "Friday", unavailable: false, slots: [] },
      { day: "Saturday", unavailable: false, slots: [] }
    ]
  });

  const fetchAvailability = useCallback(async () => {
    try {
      const data = await getAvailability(userId);
      setAvailabilityData(data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchAvailability();
    }
  }, [userId, fetchAvailability]);

  const handleSave = async () => {
    try {
      await saveAvailability({
        userId,
        ...availabilityData
      });
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  const handleDayToggle = (index) => {
    const newData = {...availabilityData};
    newData.availability[index].unavailable = !newData.availability[index].unavailable;
    setAvailabilityData(newData);
  };

  const handleTimeChange = (dayIndex, time, isStartTime = true) => {
    const newData = {...availabilityData};
    const currentSlots = newData.availability[dayIndex].slots[0] || { startTime: '', endTime: '' };
    
    if (isStartTime) {
      currentSlots.startTime = time;
    } else {
      currentSlots.endTime = time;
    }
  
    if (!newData.availability[dayIndex].slots.length) {
      newData.availability[dayIndex].slots.push(currentSlots);
    } else {
      newData.availability[dayIndex].slots[0] = currentSlots;
    }
    
    setAvailabilityData(newData);
  };

  return {
    availabilityData,
    handleSave,
    handleDayToggle,
    handleTimeChange,    
    setAvailabilityData
  };
}