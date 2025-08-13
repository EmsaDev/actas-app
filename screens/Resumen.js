import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,Image,SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { getMonthName } from '../utils/dateHelpers';
import Footer from '../components/Footer';


const Resumen = ({ route }) => {
  const formData = route.params?.formData || {};
  const firmas = formData.firmas || {};

  // Función para generar el HTML del PDF
  const generatePDFHtml = () => {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            .section { margin-bottom: 25px; }
            .section-title { 
              color: #3498db; 
              font-weight: bold;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            .label { font-weight: bold; }
            .firma-container { margin-top: 15px; text-align: center; }
            .firma-img { max-width: 200px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h1>ACTA DE REVISIÓN</h1>
          
          <div class="section">
            <h2 class="section-title">DATOS DEL CLIENTE</h2>
            <p><span class="label">Ciudad:</span> ${formData.ciudad || 'N/A'}</p>
            <p><span class="label">Ciudad:</span> ${formData.dpto || 'N/A'}</p>
            <p><span class="label">Nombre:</span> ${formData.nombreCliente || 'N/A'}</p>
            <!-- Agrega todos los demás campos -->
          </div>

          <!-- Sección de firmas -->
          <div class="section">
            <h2 class="section-title">FIRMAS</h2>
            ${firmas.firma1 ? `
              <div class="firma-container">
                <p>Firma del Cliente</p>
                <img class="firma-img" src="${firmas.firma1}" />
              </div>
            ` : ''}
            ${firmas.firma2 ? `
              <div class="firma-container">
                <p>Firma del Cliente</p>
                <img class="firma-img" src="${firmas.firma2}" />
              </div>
            ` : ''}
            ${firmas.firma3 ? `
              <div class="firma-container">
                <p>Firma del Cliente</p>
                <img class="firma-img" src="${firmas.firma3}" />
              </div>
            ` : ''}
            <!-- firmas -->
          </div>
        </body>
      </html>
    `;
  };

  // Función para exportar a PDF
  const handleExportPDF = async () => {
    try {
      const html = generatePDFHtml();
      const { uri } = await Print.printToFileAsync({
        html,
        width: 612,   // Tamaño carta en puntos (8.5x11 pulgadas)
        height: 792,
      });

      // Generar nombre del archivo con fecha/hora
      const now = new Date();
      const fileName = `ActaRevision_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}-${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}.pdf`;
      
      const newUri = FileSystem.documentDirectory + fileName;
      await FileSystem.moveAsync({
        from: uri,
        to: newUri
      });

      await Sharing.shareAsync(newUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Exportar Acta',
        UTI: 'com.adobe.pdf'
      });

    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el PDF: ' + error.message);
    }
  };

  //console.log("Firmas recibidas:", firmas); // Para debug
  
  // Obtener fecha y hora actual
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const monthName = getMonthName(month);
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  // Generar el texto completo
  const generateFullText = () => {
    return `
INFORMACIÓN DEL CLIENTE:
- Ciudad: ${formData.ciudad}
- Departamento: ${formData.dpto}
- Suscriptor: ${formData.suscriptor}
- Código SIC: ${formData.codigoSic}
- Nombre del Cliente: ${formData.nombreCliente}
- Dirección: ${formData.direccion}
- Teléfono: ${formData.telefonoCliente}
- Tarifa: ${formData.tarifa}
- Tipo de Cliente: ${formData.tipoCliente}
- Nivel de Tensión: ${formData.nivelTension}
- Transformador No.: ${formData.transformadorNo}
- Nodo de Transformador No.: ${formData.nodoTransformadorNo}
- Nodo Acometida: ${formData.nodoAcometida}
- Capacidad: ${formData.capacidad}
- Razón Social: ${formData.razonSocial}
- Subestación: ${formData.subestacion}
- Circuito: ${formData.circuito}

ACTA DE REVISIÓN:

En ${formData.ciudad}, a los ${day} días del ${monthName} del año ${year}, a las ${formattedTime} horas se hicieron presentes los Sres. ${formData.representante1 || 'Representante 1'} y ${formData.representante2 || 'Representante 2'} en representación de las empresas ${formData.empresa1 || 'Empresa 1'} y ${formData.empresa2 || 'Empresa 2'} respectivamente, con el fin de realizar una revisión al equipo de sistema de medida del inmueble. Se informa al suscriptor y/o usuario su derecho de solicitar la asesoría o participación de un técnico particular conforme a lo establecido en las Condiciones Uniformes del Contrato de Servicio Público suscrito con el Representante de la frontera. Cumplido este tiempo se procede a efectuar la revisión. El suscriptor hace uso de su derecho: SÍ(${formData.derecho === 'SI' ? 'X' : ' '}) NO (${formData.derecho === 'NO' ? 'X' : ' '}).
En las mediciones correspondientes a fronteras comerciales representadas por ${formData.fronteraComercial || '      '}, se procede a conformidad con las Resoluciones emitidas por la CREG, en particular lo establecido en el reglamento de comercialización y código de medida.
    `;
  };

 /* const handleExportTXT = async () => {
    try {
      const textContent = generateFullText();
      const fileUri = FileSystem.documentDirectory + `formulario_${formData.codigoSic}_${Date.now()}.txt`;
      
      await FileSystem.writeAsStringAsync(fileUri, textContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/plain',
        dialogTitle: 'Exportar formulario',
        UTI: 'public.plain-text',
      });
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo exportar el archivo: ' + error.message);
    }
  };*/

  const handleExportCSV = async () => {
  try {
    // Encabezados CSV
    const headers = [
      'Campo', 
      'Valor'
    ].join(',');

    // Convertir datos a filas CSV
    const rows = Object.entries(formData).map(([key, value]) => {
      // Manejar objetos anidados (como firmas)
      if (typeof value === 'object' && value !== null) {
        return `${key},"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      return `${key},"${String(value || '').replace(/"/g, '""')}"`;
    }).join('\n');

    const csvContent = `${headers}\n${rows}`;
    //const fileName = `ActaRevision_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
    // Generar nombre del archivo con fecha/hora
    const now = new Date();
    const fileName = `ActaRevision_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}-${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}.csv`;
    const fileUri = FileSystem.documentDirectory + fileName;
      
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // 4. Opciones avanzadas de compartir
    const shareOptions = {
      mimeType: 'text/csv',
      dialogTitle: 'Exportar Acta como CSV',
      UTI: 'public.comma-separated-values-text',
      saveToFiles: true, // Permite guardar con el gestor de archivos
    };

    // 5. Mostrar diálogo de compartir con más opciones
    const result = await Sharing.shareAsync(fileUri, shareOptions);

    await Sharing.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: 'Exportar como CSV',
      UTI: 'public.comma-separated-values-text',
    });


  } catch (error) {
    Alert.alert('Error', 'No se pudo exportar el CSV: ' + error.message);
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Resumen de la visita</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Datos del Cliente</Text>
              <Text style={styles.text}><Text style={styles.label}>Ciudad:</Text> {formData.ciudad}</Text>
              <Text style={styles.text}><Text style={styles.label}>Departamento:</Text> {formData.dpto}</Text>
              <Text style={styles.text}><Text style={styles.label}>Suscriptor:</Text> {formData.suscriptor}</Text>
              <Text style={styles.text}><Text style={styles.label}>Código SIC:</Text> {formData.codigoSic}</Text>
              <Text style={styles.text}><Text style={styles.label}>Nombre:</Text> {formData.nombreCliente}</Text>
              <Text style={styles.text}><Text style={styles.label}>Dirección:</Text> {formData.direccion}</Text>
              <Text style={styles.text}><Text style={styles.label}>Teléfono:</Text> {formData.telefonoCliente}</Text>
              <Text style={styles.text}><Text style={styles.label}>Tarifa:</Text> {formData.tarifa}</Text>
              <Text style={styles.text}><Text style={styles.label}>Tipo Cliente:</Text> {formData.tipoCliente}</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Datos Técnicos</Text>
              <Text style={styles.text}><Text style={styles.label}>Nivel Tensión:</Text> {formData.nivelTension}</Text>
              <Text style={styles.text}><Text style={styles.label}>Transformador No.:</Text> {formData.transformadorNo}</Text>
              <Text style={styles.text}><Text style={styles.label}>Nodo Transf.:</Text> {formData.nodoTransformadorNo}</Text>
              <Text style={styles.text}><Text style={styles.label}>Nodo Acometida:</Text> {formData.nodoAcometida}</Text>
              <Text style={styles.text}><Text style={styles.label}>Capacidad:</Text> {formData.capacidad}</Text>
              <Text style={styles.text}><Text style={styles.label}>Razón Social:</Text> {formData.razonSocial}</Text>
              <Text style={styles.text}><Text style={styles.label}>Subestación:</Text> {formData.subestacion}</Text>
              <Text style={styles.text}><Text style={styles.label}>Circuito:</Text> {formData.circuito}</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Acta de Revisión</Text>
              <Text style={styles.generatedText}>
                En {formData.ciudad}, a los {day} días de {month} del año {year}, a las {formattedTime} horas se hicieron presentes los Sres. {formData.representante1 || 'Representante 1'} y {formData.representante2 || 'Representante 2'}...
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Firmas Registradas</Text>
              
              {firmas.firma1 ? (
                <View style={styles.firmaContainer}>
                  <Text>Firma del Cliente:</Text>
                  <Image 
                    source={{ uri: firmas.firma1 }} 
                    style={styles.firmaImage}
                    resizeMode="contain"
                    onError={(e) => console.log("Error carga firma1:", e.nativeEvent.error)}
                  />
                </View>
              ) : (
                <Text style={styles.firmaFaltante}>Firma del cliente no registrada</Text>
              )}

              {firmas.firma2 ? (
                <View style={styles.firmaContainer}>
                  <Text>Firma del Técnico:</Text>
                  <Image 
                    source={{ uri: firmas.firma2 }} 
                    style={styles.firmaImage}
                    resizeMode="contain"
                    onError={(e) => console.log("Error carga firma2:", e.nativeEvent.error)}
                  />
                </View>
              ) : (
                <Text style={styles.firmaFaltante}>Firma del técnico no registrada</Text>
              )}

              {firmas.firma3 ? (
                <View style={styles.firmaContainer}>
                  <Text>Firma del Supervisor:</Text>
                  <Image 
                    source={{ uri: firmas.firma3 }} 
                    style={styles.firmaImage}
                    resizeMode="contain"
                    onError={(e) => console.log("Error carga firma3:", e.nativeEvent.error)}
                  />
                
                </View>
                
              ) : (
                <Text style={styles.firmaFaltante}>Firma del supervisor no registrada</Text>
              )}
            </View>
            <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.exportButton, styles.exportButtonCSV]}
              onPress={handleExportCSV}
            >
              <Text style={[styles.exportButtonCSVText]}>Exportar a CSV</Text>
            </TouchableOpacity>

             <TouchableOpacity 
                style={[styles.exportButton, styles.exportButtonPDF]}
                onPress={handleExportPDF}
              >
                <Text style={[styles.exportButtonText, styles.exportButtonPDFText]}>Exportar a PDF</Text>
              </TouchableOpacity>
              </View>
            <Footer/>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60, // Espacio para el botón de menú
    paddingBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333ff0',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  text: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 22,
    color: '#777',   
  },
  generatedText: {
    fontStyle: 'italic',
    lineHeight: 22,
    color: '#555',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10, // Espacio entre botones
  },
  exportButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  exportButtonCSV: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#333ff0',
  },
  exportButtonCSVText: {
    color: '#333ff0', // Texto azul
    fontWeight: 'bold',
    fontSize: 16,          // Texto azul
  },
  exportButtonPDF: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  exportButtonPDFText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
  },
  firmaImage: {
    width: 200,
    height: 80,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  }
  
});

export default Resumen;