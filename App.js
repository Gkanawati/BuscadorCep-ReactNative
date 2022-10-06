import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import api from "./src/services/api";
import { TextInputMask } from "react-native-masked-text";

function App() {
  const [cep, setCep] = useState("");
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);

  async function buscar() {
    if (cep === "") {
      alert("Digite um CEP válido");
      setCep("");
      return;
    }

    try {
      /*  alert(cep); */
      const response = await api.get(`${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);

      if (cepUser === "ERROR NaN") {
        alert("Digite um CEP válido");
      }

      Keyboard.dismiss();
    } catch (error) {
      console.log("ERROR", +error);
    }
  }

  function limpar() {
    setCep("");
    setCepUser(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.card}>
          <StatusBar style="dark" />
          <Text style={styles.text}>Digite o CEP desejado:</Text>
          <TextInputMask
            style={styles.input}
            placeholder="Ex: 13860023"
            type={"custom"}
            onChangeText={(texto) => setCep(texto)}
            options={{
              mask: "99999999",
            }}
            value={cep}
            ref={inputRef}
          />
          <View style={styles.areaBtn}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#41b031" }]}
              onPress={buscar}
            >
              <Text style={styles.btnTxt}>BUSCAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#58ff42" }]}
              onPress={limpar}
            >
              <Text style={styles.btnTxt}>LIMPAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {cepUser && (
        <View style={{ alignItems: "center", flex: 1 }}>
          <View style={styles.ViewResultado}>
            <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
            <Text style={styles.itemText}>BAIRRO: {cepUser.bairro}</Text>
            <Text style={styles.itemText}>
              LOGRADOURO: {cepUser.logradouro}
            </Text>
            {cepUser.complemento !== "" ? (
              <Text style={styles.itemText}>
                COMPLEMENTO: {cepUser.complemento}
              </Text>
            ) : null}
            <Text style={styles.itemText}>DDD: {cepUser.ddd}</Text>
            <Text style={styles.itemText}>CIDADE: {cepUser.localidade}</Text>
            <Text style={styles.itemText}>ESTADO (UF): {cepUser.uf}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    backgroundColor: "#fff",
  },
  center: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    elevation: 2,
    shadowColor: "#000",
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 100,
    borderRadius: 8,
  },
  btnTxt: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  ViewResultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  itemText: {
    fontSize: 19,
    paddingVertical: 5,
    color: "#121212",
    fontWeight: "bold",
  },
});

export default App;
