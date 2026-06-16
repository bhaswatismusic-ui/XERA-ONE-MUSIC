// ============================================
// Form Service
// Handles form submissions with multiple backend options
// ============================================

import type { WorldId } from '../types';
import { getAdapter } from './ContentService';

// ============================================
// Form Service Configuration
// ============================================

export interface FormServiceConfig {
  backend: 'local' | 'supabase' | 'hubspot' | 'zoho' | 'salesforce' | 'custom';
  endpoint?: string;
  apiKey?: string;
  hubspotPortalId?: string;
  hubspotFormId?: string;
  zohoApiKey?: string;
  salesforceApiKey?: string;
}

let formConfig: FormServiceConfig | null = null;

/**
 * Initialize the form service
 */
export function initializeFormService(config: FormServiceConfig): void {
  formConfig = config;
}

/**
 * Submit a form
 */
export async function submitForm(
  worldId: WorldId,
  formId: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string; id?: string }> {
  if (!formConfig) {
    // Default to local adapter
    return getAdapter().submitForm(worldId, formId, data);
  }

  switch (formConfig.backend) {
    case 'supabase':
      return submitToSupabase(worldId, formId, data);
    case 'hubspot':
      return submitToHubspot(worldId, formId, data);
    case 'zoho':
      return submitToZoho(worldId, formId, data);
    case 'salesforce':
      return submitToSalesforce(worldId, formId, data);
    case 'custom':
      return submitToCustom(worldId, formId, data);
    case 'local':
    default:
      return getAdapter().submitForm(worldId, formId, data);
  }
}

// ============================================
// Backend Implementations
// ============================================

/**
 * Submit to Supabase
 */
async function submitToSupabase(
  worldId: WorldId,
  formId: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    // Supabase integration would go here
    // This is a placeholder - actual implementation would use @supabase/supabase-js
    console.log('Supabase form submission:', { worldId, formId, data });

    return {
      success: true,
      message: 'Form submitted to Supabase successfully',
      id: `supabase-${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Submission failed',
    };
  }
}

/**
 * Submit to HubSpot
 */
async function submitToHubspot(
  worldId: WorldId,
  formId: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    if (!formConfig?.hubspotPortalId || !formConfig?.hubspotFormId) {
      throw new Error('HubSpot configuration missing');
    }

    // HubSpot API integration
    const portalId = formConfig.hubspotPortalId;
    const hubspotFormId = formConfig.hubspotFormId;

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${hubspotFormId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: Object.entries(data).map(([name, value]) => ({
            name,
            value: String(value),
          })),
          context: {
            pageUri: window.location.href,
            pageName: document.title,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('HubSpot submission failed');
    }

    return {
      success: true,
      message: 'Form submitted to HubSpot successfully',
      id: `hubspot-${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Submission failed',
    };
  }
}

/**
 * Submit to Zoho
 */
async function submitToZoho(
  worldId: WorldId,
  formId: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    // Zoho API integration would go here
    console.log('Zoho form submission:', { worldId, formId, data });

    return {
      success: true,
      message: 'Form submitted to Zoho successfully',
      id: `zoho-${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Submission failed',
    };
  }
}

/**
 * Submit to Salesforce
 */
async function submitToSalesforce(
  worldId: WorldId,
  formId: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    // Salesforce API integration would go here
    console.log('Salesforce form submission:', { worldId, formId, data });

    return {
      success: true,
      message: 'Form submitted to Salesforce successfully',
      id: `salesforce-${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Submission failed',
    };
  }
}

/**
 * Submit to custom endpoint
 */
async function submitToCustom(
  worldId: WorldId,
  formId: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    if (!formConfig?.endpoint) {
      throw new Error('Custom endpoint not configured');
    }

    const response = await fetch(formConfig.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(formConfig.apiKey ? { 'X-API-Key': formConfig.apiKey } : {}),
      },
      body: JSON.stringify({
        worldId,
        formId,
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Custom endpoint submission failed');
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Form submitted successfully',
      id: result.id || `custom-${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Submission failed',
    };
  }
}

// ============================================
// React Hook
// ============================================

import { useState, useCallback } from 'react';

export function useFormSubmission(worldId: WorldId, formId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (data: Record<string, unknown>) => {
      setIsSubmitting(true);
      setError(null);
      setIsSuccess(false);

      try {
        const result = await submitForm(worldId, formId, data);

        if (result.success) {
          setIsSuccess(true);
          return { success: true, id: result.id };
        } else {
          setError(result.message);
          return { success: false, error: result.message };
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Submission failed';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsSubmitting(false);
      }
    },
    [worldId, formId]
  );

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return {
    submit,
    isSubmitting,
    isSuccess,
    error,
    reset,
  };
}

export default {
  initialize: initializeFormService,
  submit: submitForm,
};
