import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Ayuda = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {/* Botón flotante de menú */}
      <TouchableOpacity 
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={24} color="#333ff0" />
      </TouchableOpacity>
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Centro de Ayuda</Text>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📱 Cómo usar la aplicación</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Completa los formularios en orden secuencial</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Puedes modificar datos anteriores navegando con el menú</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>Revisa cuidadosamente antes de exportar</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🛠 Soporte Técnico</Text>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={18} color="#3498db" />
            <Text style={styles.contactText}>soporte@empresa.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={18} color="#3498db" />
            <Text style={styles.contactText}>+57 123 456 7890</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="time" size={18} color="#3498db" />
            <Text style={styles.contactText}>Lunes a Viernes: 8am - 6pm</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>ℹ️ Información Importante</Text>
          <Text style={styles.noteText}>
            Todos tus datos están protegidos bajo nuestras políticas de seguridad y privacidad.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
    color: '#3498db',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default Ayuda;