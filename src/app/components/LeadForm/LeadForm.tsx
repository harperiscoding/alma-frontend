'use client';

import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import leadSchema from "./leadSchema.json";
import leadUiSchema from "./leadUiSchema.json";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Typography } from '@mui/material';

export const LeadForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64 = await toBase64(file);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      resume: base64
    }));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result?.toString() || '';
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });

  const handleSubmit = async () => {
    setSubmitted(true);
    const newLead = {
      ...formData,
      id: uuidv4(),
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    };

    try {
      // TODO: implement API endpoint to handle submission
      // const res = await fetch('/api/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newLead)
      // });

      if (true) {
        router.push('/thank-you');
      } else {
        setErrors('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrors('Something went wrong.');
    }
  };

  const [submitted, setSubmitted] = useState(false);

  return (
    <Box maxWidth={600} mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom>
        Get An Assessment Of Your Immigration Case
      </Typography>

      <JsonForms
        schema={leadSchema}
        uischema={leadUiSchema}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setFormData(data)}
        validationMode={submitted ? 'ValidateAndShow' : 'ValidateAndHide'}
      />

      <Box mt={2}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </Box>

      {errors && <Typography color="error">{errors}</Typography>}

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
