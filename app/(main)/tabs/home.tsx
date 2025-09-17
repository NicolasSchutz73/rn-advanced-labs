import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>
      <Link href="/detail/42" style={styles.link}>
        Aller au détail (id = 42)
      </Link>

        <Link href="/tp3-forms/formik" style={styles.link}>
            Formulaire avec Formik
        </Link>
        <Link href="/tp3-forms/rhf" style={styles.link}>
            Formulaire avec RHF
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  link: {
    fontSize: 18,
    color: '#1B73E8',
  },
});

