import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Imagem grande no topo */}
      <Image
        source={require('@/assets/images/GTT-Ped-logo.png')} 
        style={styles.bannerImage}
        contentFit="contain"
      />
      
      {/* Container dos botões */}
      <View style={styles.buttonsContainer}>
        <Link href="/(tabs)/(home)/duvidas" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Dúvidas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/(home)/intercorrencias" asChild> 
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Intercorrências</Text>
          </TouchableOpacity>
        </Link> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerImage: {
    width: '100%',
    height: 350,
    marginTop: 100, 
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 30,
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#19856E',
    width: '100%',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});