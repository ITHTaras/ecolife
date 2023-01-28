import { StyleSheet, Text, View } from "react-native";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";

function Admin() {
  const { adminAuth } = useSelector((store) => store.user);

  return <View>{adminAuth ? <AdminDashboard /> : <AdminAuth />}</View>;
}

const styles = StyleSheet.create({});

export default Admin;
