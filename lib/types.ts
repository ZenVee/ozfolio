export interface Gallery {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  imageCount: number;
  visibility: 'public' | 'private' | 'unlisted';
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface ImageItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  galleryId: string;
  galleryName: string;
  resolution: string;
  fileSize: string;
  uploadedAt: string;
  views: number;
  tags: string[];
  width: number;
  height: number;
}

export interface PortfolioSettings {
  portfolioName: string;
  portfolioUrl: string;
  description: string;
  businessName: string;
  profileImage: string;
  bannerImage: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  theme: string;
}

export interface AnalyticsData {
  date: string;
  views: number;
  uniqueVisitors: number;
}

export interface ActivityItem {
  id: string;
  type: 'upload' | 'gallery_created' | 'view_milestone' | 'settings_updated';
  message: string;
  timestamp: string;
  meta?: string;
}
