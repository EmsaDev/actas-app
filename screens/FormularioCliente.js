import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const FormularioCliente = ({ navigation }) => {
  const [formData, setFormData] = useState({
    ciudad: '',
    dpto: '',
    suscriptor: '',
    No: '20610',
    codigoSic: '',
    nombreCliente: '',
    direccion: '',
    telefonoCliente: '',
    tarifa: '',
    tipoCliente: '',
    nivelTension: '',
    transformadorNo: '',
    nodoTransformadorNo: '',
    nodoAcometida: '',
    capacidad: '',
    razonSocial: '',
    subestacion: '',
    circuito: '',
  });

  const [errors, setErrors] = useState({
    ciudad: null,
    dpto: null,
    nombreCliente: null,
    direccion: null,
    suscriptorOrCodigo: null
  });

  const validateForm = () => {
    const newErrors = {
      ciudad: !formData.ciudad ? 'La ciudad es obligatoria' : null,
      dpto: !formData.dpto ? 'El departamento es obligatorio' : null,
      nombreCliente: !formData.nombreCliente ? 'El nombre del cliente es obligatorio' : null,
      direccion: !formData.direccion ? 'La dirección es obligatoria' : null,
      suscriptorOrCodigo: (!formData.suscriptor && !formData.codigoSic) ? 
        'Debe ingresar suscriptor o código SIC' : null
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some(error => error !== null);
    
    if (!isValid) {
      Alert.alert(
        'Formulario incompleto',
        'Por favor complete todos los campos obligatorios',
        [{ text: 'Entendido' }]
      );
    }

    return isValid;
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
        suscriptorOrCodigo: (name === 'suscriptor' || name === 'codigoSic') && 
          ((name === 'suscriptor' && value) || (name === 'codigoSic' && value)) ? 
          null : errors.suscriptorOrCodigo
      });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigation.navigate('Formulario2', { formData });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={24} color="#333ff0" />
        </TouchableOpacity>

      <ScrollView 
        style={{ flex: 1 }}  // Asegura que el ScrollView ocupe todo el espacio
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Datos del Cliente</Text>
        
        {/* Campo Ciudad */}
        <Text style={styles.label}>Ciudad *</Text>
        <TextInput
          style={[styles.input, errors.ciudad && styles.errorInput]}
          value={formData.ciudad}
          onChangeText={(text) => handleChange('ciudad', text)}
          placeholder="Ej: Villavicencio"
        />
        {errors.ciudad && <Text style={styles.errorText}>{errors.ciudad}</Text>}

        {/* Campo Departamento */}
        <Text style={styles.label}>Departamento *</Text>
        <TextInput
          style={[styles.input, errors.dpto && styles.errorInput]}
          value={formData.dpto}
          onChangeText={(text) => handleChange('dpto', text)}
          placeholder="Ej: Meta"
        />
        {errors.dpto && <Text style={styles.errorText}>{errors.dpto}</Text>}

        {/* Campo Suscriptor */}
        <Text style={styles.label}>Suscriptor {!formData.codigoSic && '*'}</Text>
        <TextInput
          style={[styles.input, errors.suscriptorOrCodigo && !formData.codigoSic && styles.errorInput]}
          value={formData.suscriptor}
          onChangeText={(text) => handleChange('suscriptor', text)}
          keyboardType="phone-pad"
          placeholder="Número de suscriptor"
        />

        {/* Campo Código SIC */}
        <Text style={styles.label}>Código SIC {!formData.suscriptor && '*'}</Text>
        <TextInput
          style={[styles.input, errors.suscriptorOrCodigo && !formData.suscriptor && styles.errorInput]}
          value={formData.codigoSic}
          onChangeText={(text) => handleChange('codigoSic', text)}
          placeholder="Código SIC"
        />
        {errors.suscriptorOrCodigo && <Text style={styles.errorText}>{errors.suscriptorOrCodigo}</Text>}

        {/* Campo Nombre del Cliente */}
        <Text style={styles.label}>Nombre del Cliente *</Text>
        <TextInput
          style={[styles.input, errors.nombreCliente && styles.errorInput]}
          value={formData.nombreCliente}
          onChangeText={(text) => handleChange('nombreCliente', text)}
          placeholder="Nombre completo"
        />
        {errors.nombreCliente && <Text style={styles.errorText}>{errors.nombreCliente}</Text>}

        {/* Campo Dirección */}
        <Text style={styles.label}>Dirección *</Text>
        <TextInput
          style={[styles.input, errors.direccion && styles.errorInput]}
          value={formData.direccion}
          onChangeText={(text) => handleChange('direccion', text)}
          placeholder="Dirección completa"
        />
        {errors.direccion && <Text style={styles.errorText}>{errors.direccion}</Text>}

        {/* Otros campos */}
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={formData.telefonoCliente}
          onChangeText={(text) => handleChange('telefonoCliente', text)}
          keyboardType="phone-pad"
          placeholder="Teléfono de contacto"
        />

        <Text style={styles.label}>Tarifa</Text>
        <View style={styles.radioGroup}>
          {['res', 'com', 'ind', 'ofic', 'esp'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.radioButton,
                formData.tipoCliente === type && styles.radioButtonSelected
              ]}
              onPress={() => handleChange('tipoCliente', type)}
            >
              <Text style={[
                styles.radioButtonText,
                formData.tipoCliente === type && styles.radioButtonTextSelected
              ]}>
                {type === 'res' && 'Residencial'}
                {type === 'com' && 'Comercial'}
                {type === 'ind' && 'Industrial'}
                {type === 'ofic' && 'Oficina'}
                {type === 'esp' && 'Especial'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
     </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 60,  // Espacio para el botón de menú
    paddingBottom: 30,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  radioButton: {
    width: '30%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#333ff0',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    backgroundColor: '#333ff0',
    borderColor: '#333ff0',
  },
  radioButtonText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333ff0',
    fontWeight: '500',
  },
  radioButtonTextSelected: {
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#333ff0',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width:'30%',
    alignSelf: 'center', 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FormularioCliente;