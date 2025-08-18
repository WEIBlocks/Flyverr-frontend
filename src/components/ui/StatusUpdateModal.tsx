import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Clock, X } from 'lucide-react';
import Modal from '../Modal';

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onUpdate: (data: {
    status: "active" | "suspended" | "banned";
    reason?: string;
    adminNotes?: string;
    suspensionDuration?: number;
  }) => void;
  isLoading: boolean;
}

export default function StatusUpdateModal({
  isOpen,
  onClose,
  currentStatus,
  onUpdate,
  isLoading
}: StatusUpdateModalProps) {
  const [formData, setFormData] = useState({
    status: currentStatus as "active" | "suspended" | "banned",
    reason: '',
    adminNotes: '',
    suspensionDuration: ''
  });

  // Update form data when modal opens or currentStatus changes
  React.useEffect(() => {
    setFormData({
      status: currentStatus as "active" | "suspended" | "banned",
      reason: '',
      adminNotes: '',
      suspensionDuration: ''
    });
  }, [currentStatus, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      status: formData.status,
      reason: formData.reason || undefined,
      adminNotes: formData.adminNotes || undefined,
      suspensionDuration: formData.suspensionDuration ? parseInt(formData.suspensionDuration) : undefined
    });
    
    // Clear form after submission
    setFormData({
      status: currentStatus as "active" | "suspended" | "banned",
      reason: '',
      adminNotes: '',
      suspensionDuration: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
   <Modal size='sm'>
      <div >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-flyverr-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-flyverr-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Update User Status
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Status Display */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Status
            </Label>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(currentStatus)}>
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </Badge>
            </div>
          </div>

          {/* New Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Status <span className="text-red-500">*</span>
            </Label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "suspended" | "banned" })}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
              required
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Reason
            </Label>
            <Textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Reason for status change (optional)"
              rows={3}
              maxLength={500}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
              {formData.reason.length}/500
            </div>
          </div>

          {/* Admin Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin Notes
            </Label>
            <Textarea
              value={formData.adminNotes}
              onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
              placeholder="Internal notes for administrators (optional)"
              rows={3}
              maxLength={1000}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
              {formData.adminNotes.length}/1000
            </div>
          </div>

          {/* Suspension Duration - Only show for suspended/banned */}
          {(formData.status === 'suspended' || formData.status === 'banned') && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Suspension Duration (days)</span>
              </Label>
              <select
                value={formData.suspensionDuration}
                onChange={(e) => setFormData({ ...formData, suspensionDuration: e.target.value })}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
              >
                <option value="">Permanent</option>
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">365 days</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Choose Permanent for no end date
              </p>
            </div>
          )}

          {/* Warning for status changes */}
          {formData.status !== currentStatus && (
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium">Status Change Warning</p>
                  <p className="mt-1">
                    Changing user status from <strong>{currentStatus}</strong> to <strong>{formData.status}</strong> will affect their access to the platform.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
            >
              {isLoading ? 'Updating...' : 'Update Status'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
