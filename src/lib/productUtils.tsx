import React from "react";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText, 
  ImageIcon, 
  Package, 
  Upload 
} from "lucide-react";

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
    case "draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
  }
};

export const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    case "draft":
      return <FileText className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export const getFileTypeIcon = (fileType: string): React.ReactElement => {
  if (fileType.startsWith('image/')) {
    return <ImageIcon className="w-4 h-4" />;
  } else if (fileType.includes('pdf')) {
    return <FileText className="w-4 h-4" />;
  } else if (fileType.includes('zip') || fileType.includes('rar')) {
    return <Package className="w-4 h-4" />;
  } else if (fileType.includes('video/')) {
    return <Upload className="w-4 h-4" />;
  } else {
    return <FileText className="w-4 h-4" />;
  }
};
