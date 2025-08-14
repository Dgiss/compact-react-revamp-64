import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Database, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ScanMetricsPanelProps {
  scanMetrics: any;
  isVisible: boolean;
  onToggle: () => void;
}

export const ScanMetricsPanel: React.FC<ScanMetricsPanelProps> = ({
  scanMetrics,
  isVisible,
  onToggle
}) => {
  if (!scanMetrics) return null;

  const {
    batchCount = 0,
    totalRequests = 0,
    duplicates = 0,
    mappingErrors = 0,
    errors = [],
    batches = [],
    mappingStats = {},
    isCompleteScan = false
  } = scanMetrics;

  const hasErrors = errors.length > 0 || mappingErrors > 0;
  const totalVehicles = batches[batches.length - 1]?.totalVehicles || 0;

  return (
    <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
      <Collapsible open={isVisible} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-blue-100/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg text-blue-800">
                  Scan Metrics {isCompleteScan && <Badge variant="secondary" className="ml-2">Complet</Badge>}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {hasErrors && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.length + mappingErrors} erreurs
                  </Badge>
                )}
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {totalVehicles} véhicules
                </Badge>
                {isVisible ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Performance Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 border">
                <div className="text-sm text-gray-600">Batches</div>
                <div className="text-lg font-semibold text-blue-600">{batchCount}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <div className="text-sm text-gray-600">Requêtes</div>
                <div className="text-lg font-semibold text-green-600">{totalRequests}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <div className="text-sm text-gray-600">Doublons</div>
                <div className="text-lg font-semibold text-orange-600">{duplicates}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <div className="text-sm text-gray-600">Véhicules</div>
                <div className="text-lg font-semibold text-purple-600">{totalVehicles}</div>
              </div>
            </div>

            {/* Mapping Quality */}
            {mappingStats && Object.keys(mappingStats).length > 0 && (
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Qualité du mapping
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Succès:</span>
                    <span className="ml-2 font-medium text-green-600">{mappingStats.successful || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Erreurs:</span>
                    <span className="ml-2 font-medium text-red-600">{mappingStats.errors || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sans immat:</span>
                    <span className="ml-2 font-medium text-orange-600">{mappingStats.missingImmat || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sans company:</span>
                    <span className="ml-2 font-medium text-yellow-600">{mappingStats.missingCompany || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sans device:</span>
                    <span className="ml-2 font-medium text-blue-600">{mappingStats.missingDevice || 0}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Batch Details */}
            {batches.length > 0 && (
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Détails des batches (derniers 5)
                </h4>
                <div className="space-y-2 text-sm">
                  {batches.slice(-5).map((batch, index) => (
                    <div key={index} className="flex justify-between items-center py-1 px-2 bg-gray-50 rounded">
                      <span>Batch {batch.batch}</span>
                      <div className="flex gap-3 text-xs">
                        <span className="text-green-600">{batch.vehicles} véhicules</span>
                        <span className="text-blue-600">{batch.newTokens} tokens</span>
                        <span className="text-gray-600">{batch.requestTime}ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Errors */}
            {hasErrors && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Erreurs détectées
                </h4>
                {errors.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-red-700 mb-2">Erreurs de requête:</div>
                    <div className="space-y-1 text-xs">
                      {errors.slice(0, 3).map((error, index) => (
                        <div key={index} className="bg-white p-2 rounded border border-red-200">
                          <span className="font-medium">Requête {error.request}:</span> {error.error}
                        </div>
                      ))}
                      {errors.length > 3 && (
                        <div className="text-red-600 text-center">... et {errors.length - 3} autres erreurs</div>
                      )}
                    </div>
                  </div>
                )}
                {mappingErrors > 0 && (
                  <div className="text-sm">
                    <span className="font-medium text-red-700">Erreurs de mapping:</span>
                    <span className="ml-2 text-red-600">{mappingErrors} véhicules</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};