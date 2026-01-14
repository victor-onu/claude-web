import { redirect } from "next/navigation";

export default function AdminAssignmentsPage() {
  // Redirect to mentor assignments page which admins can also use
  redirect("/mentor/assignments");
}
