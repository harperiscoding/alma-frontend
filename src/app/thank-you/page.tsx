import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <Box maxWidth={600} mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom>
        Get An Assessment Of Your Immigration Case
      </Typography>

      <Typography variant="body1">
        Your information was submitted to our team of immigration attorneys.
      </Typography>
      <Typography variant="body1">
        Expect an email from <b>hello@tryalma.ai</b>
      </Typography>
      <Link href="/" passHref>
        <button style={{ marginTop: 32, padding: '12px 24px', fontSize: 16, cursor: 'pointer' }}>
          Go back to homepage
        </button>
      </Link>
    </Box>
  );
}