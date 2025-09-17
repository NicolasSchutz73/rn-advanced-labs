import { useRouter } from 'expo-router';
import { RobotForm } from '@/components/RobotForm';
import { useRobotsStore } from '@/store/robotsStore';

export default function CreateRobotScreen() {
  const router = useRouter();
  const createRobot = useRobotsStore(s => s.create);

  return (
    <RobotForm
      onSubmit={async (data) => {
        const ok = createRobot(data);
        if (ok) router.replace('/tabs/tp4A-robots');
        return ok;
      }}
      submitLabel="Créer le robot"
    />
  );
}