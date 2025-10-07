import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RobotForm } from '@/components/tp4b-robots-rtk/RobotForm';
import { selectRobots } from '@/features/robots/selectors';
import { createRobot } from '@/features/robots/robotsSlice';
import {RobotFormValues} from "@/validation/robotSchema";

const CreateRobotScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const robots = useSelector(selectRobots);

  const handleSubmit = async (values: RobotFormValues) => {
    dispatch(createRobot(values));
    router.replace('/tp4b-robots-rtk');
  };

  return (
    <RobotForm
      mode="create"
      robots={robots}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateRobotScreen;
