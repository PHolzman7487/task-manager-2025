import { Box, Typography, Paper, Link } from "@mui/material";
const defaultTexts = {
  about: "אודות האתר",
  aboutDescription: "אתר מנהל המשימות נועד לעזור לך לנהל, לסנן ולעקוב אחרי המשימות שלך בצורה פשוטה ונוחה.",
  teamTitle: "צוות הפיתוח:",
  teamMembers: "פניני הולצמן",
  teamList: "צוות הפיתוח: דנה, יוסי, רותם",
  contactTitle: "יצירת קשר:",
  emailLabel: "מייל",
  phoneLabel: "טלפון"
};

export default function About({ texts = defaultTexts }) {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, direction:"rtl" }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={2} textAlign="center">
          {texts.about || "אודות האתר"}
        </Typography>
        <Typography variant="body1" mb={2}>
          {texts.aboutDescription || "אתר מנהל המשימות נועד לעזור לך לנהל, לסנן ולעקוב אחרי המשימות שלך בצורה פשוטה ונוחה."}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="secondary" mb={1}>
          {texts.teamTitle || "צוות הפיתוח:"}
        </Typography>
        <Typography variant="body2" mb={2}>
          {texts.teamMembers || "פניני הולצמן"}<br />
          {texts.teamList || "צוות הפיתוח: דנה, יוסי, רותם"}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="secondary" mb={1}>
          {texts.contactTitle || "יצירת קשר:"}
        </Typography>
        <Typography variant="body2">
          {texts.emailLabel || "מייל"}: <Link href="mailto:info@holtzman.co.il">info@holtzman.co.il</Link><br />
          {texts.phoneLabel || "טלפון"}: <Link href="tel:03-1234567">03-1234567</Link>
        </Typography>
      </Paper>
    </Box>
  );
}