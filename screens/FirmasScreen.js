import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const FirmasScreen = ({ navigation, route }) => {
  const signatureRef = useRef(null);
  const [firmas, setFirmas] = useState({
    firma1: null,
    firma2: null,
    firma3: null
  });
  const [firmaActual, setFirmaActual] = useState('firma1');
  const { formData } = route.params;

  const handleOK = (signature) => {
    if (!signature) return;
    
    setFirmas(prev => ({
      ...prev,
      [firmaActual]: signature
    }));
    
    // Avanzar a la siguiente firma o finalizar
    if (firmaActual === 'firma1') {
      setFirmaActual('firma2');
    } else if (firmaActual === 'firma2') {
      setFirmaActual('firma3');
    }
  };

  const handleClear = () => {
    setFirmas(prev => ({
      ...prev,
      [firmaActual]: null
    }));
  };

  const handleFinalizar = () => {
    if (!firmas.firma1 || !firmas.firma2 || !firmas.firma3) {
      Alert.alert('Firmas incompletas', 'Debe capturar las tres firmas');
      return;
    }
  
    // Verifica que formData existe antes de continuar
    if (!route.params?.formData) {
      Alert.alert('Error', 'Datos del formulario no encontrados');
      return;
    }
  
    // Combina todos los datos correctamente
    const datosCompletos = {
      ...route.params.formData, // Datos de formularios 1, 2 y 3
      firmas: { // Objeto con las tres firmas
        firma1: firmas.firma1,
        firma2: firmas.firma2,
        firma3: firmas.firma3
      }
    };
    // Navega a Resumen con todos los datos
    navigation.navigate('Resumen', { formData: datosCompletos });
  };

  const getTitulo = () => {
    switch(firmaActual) {
      case 'firma1': return "Suscriptor/Usuario";
      case 'firma2': return "Agente Comercializador";
      case 'firma3': return "Agente Operador de Red";
      default: return "Firma";
    }
  };

  const style = `
    .m-signature-pad {
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .m-signature-pad--footer {
      display: none;
    }
  `;

  return (
    <View style={styles.container}>
      {/* Botón de menú */}
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={24} color="#333ff0" />
      </TouchableOpacity>

      <Text style={styles.titulo}>{getTitulo()}</Text>

      <Signature
        ref={signatureRef}
        onOK={handleOK}
        onClear={handleClear}
        descriptionText="Firme en el área indicada"
        clearText="Borrar"
        confirmText="Confirmar"
        webStyle={style}
        autoClear={false}
        imageType="image/png"
        style={styles.firma}
      />

      <View style={styles.botones}>
        <TouchableOpacity 
          style={styles.boton} 
          onPress={() => signatureRef.current.readSignature()}
        >
          <Text style={styles.botonTexto}>Confirmar Firma</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.boton, styles.botonLimpiar]} 
          onPress={() => signatureRef.current.clearSignature()}
        >
          <Text style={styles.botonTexto}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      {firmaActual === 'firma3' && firmas.firma3 && (
        <TouchableOpacity 
          style={styles.botonFinalizar} 
          onPress={handleFinalizar}
        >
          <Text style={styles.botonTexto}>Finalizar</Text>
        </TouchableOpacity>
      )}

      {/* Vista previa de firmas */}
      <View style={styles.vistaPrevia}>
        {firmas.firma1 && (
          <View style={styles.firmaContainer}>
            <Text style={styles.subtitulo}>Firma Suscriptor/Usuario:</Text>
            <Image source={{ uri: firmas.firma1 }} style={styles.firmaPreview} />
          </View>
        )}
        {firmas.firma2 && (
          <View style={styles.firmaContainer}>
            <Text style={styles.subtitulo}>Firma Agente Comercializador:</Text>
            <Image source={{ uri: firmas.firma2 }} style={styles.firmaPreview} />
          </View>
        )}
        {firmas.firma3 && (
          <View style={styles.firmaContainer}>
            <Text style={styles.subtitulo}>Firma AgenteOperador de Red:</Text>
            <Image source={{ uri: firmas.firma3 }} style={styles.firmaPreview} />
          </View>
        )}
      </View>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ccc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  firma: {
    height: 200,  // Más compacto pero funcional
    marginBottom: 15,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#333ff0',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  botonLimpiar: {
    backgroundColor: '#e74c3c',
  },
  botonFinalizar: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  vistaPrevia: {
    marginTop: 60,
  },
  firmaContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  firmaPreview: {
    width: 150,
    height: 75,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default FirmasScreen;