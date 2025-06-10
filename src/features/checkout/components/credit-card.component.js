import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export const CreditCardInput = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const isIncomplete = !cardNumber || !expiry || !cvc;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={19}
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChangeText={(text) => {
          // Auto insert space every 4 digits
          const cleaned = text.replace(/\D/g, "").slice(0, 16);
          const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
          setCardNumber(formatted);
        }}
      />

      <Text style={styles.label}>Expiry</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={5}
        placeholder="MM/YY"
        value={expiry}
        onChangeText={(text) => {
          let cleaned = text.replace(/\D/g, "");
          if (cleaned.length > 2) {
            cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
          }
          setExpiry(cleaned);
        }}
      />

      <Text style={styles.label}>CVC</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={4}
        placeholder="123"
        value={cvc}
        onChangeText={(text) => setCvc(text.replace(/\D/g, "").slice(0, 4))}
      />

      <Text style={styles.status}>
        {isIncomplete ? "Incomplete form" : "Ready to submit"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "tomato",
  },
});
