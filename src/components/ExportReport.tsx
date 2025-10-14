import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Table } from "lucide-react";
import { toast } from "sonner";
import { HistoricalReading } from "@/hooks/useHistoricalData";

interface ExportReportProps {
  readings: HistoricalReading[];
  timeRange: string;
}

export const ExportReport = ({ readings, timeRange }: ExportReportProps) => {
  const exportToCSV = () => {
    if (readings.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      // Create CSV header
      const headers = [
        "Fecha y Hora",
        "Frecuencia Cardíaca (BPM)",
        "HRV (ms)",
        "Temperatura (°C)",
        "GSR",
        "Nivel de Estrés (%)",
        "Órgano Sugerido",
        "Razón",
        "Confianza (%)",
      ];

      // Create CSV rows
      const rows = readings.map((r) => [
        new Date(r.timestamp).toLocaleString("es-ES"),
        r.heart_rate,
        r.hrv,
        r.temperature,
        r.gsr,
        r.stress_level,
        r.organo_sugerido_nombre || "-",
        r.organo_sugerido_razon || "-",
        r.organo_sugerido_confianza || "-",
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lumen-report-${timeRange}-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Reporte CSV descargado correctamente");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Error al exportar CSV");
    }
  };

  const exportToPDF = () => {
    if (readings.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Reporte Lumen</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #6366f1;
              border-bottom: 2px solid #6366f1;
              padding-bottom: 10px;
            }
            h2 {
              color: #4f46e5;
              margin-top: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #6366f1;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            .summary {
              background-color: #ede9fe;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <h1>📊 Reporte Biométrico Lumen</h1>
          <div class="summary">
            <p><strong>Período:</strong> ${timeRange === "day" ? "Último día" : timeRange === "week" ? "Última semana" : timeRange === "month" ? "Último mes" : "Todo el historial"}</p>
            <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString("es-ES")}</p>
            <p><strong>Total de lecturas:</strong> ${readings.length}</p>
          </div>

          <h2>📈 Datos Biométricos</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>FC (BPM)</th>
                <th>HRV (ms)</th>
                <th>Temp (°C)</th>
                <th>Estrés (%)</th>
                <th>Órgano</th>
              </tr>
            </thead>
            <tbody>
              ${readings.map((r) => `
                <tr>
                  <td>${new Date(r.timestamp).toLocaleString("es-ES")}</td>
                  <td>${r.heart_rate}</td>
                  <td>${r.hrv}</td>
                  <td>${r.temperature}</td>
                  <td>${r.stress_level}</td>
                  <td>${r.organo_sugerido_nombre || "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div class="footer">
            <p>Lumen - Biodecodificación Emocional</p>
            <p>Este reporte es solo informativo y no sustituye la consulta médica profesional</p>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lumen-report-${timeRange}-${new Date().toISOString().split("T")[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Reporte HTML descargado - Abre el archivo y usa 'Imprimir como PDF' en tu navegador");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Error al exportar reporte");
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">📥 Exportar Reporte</h3>
          <p className="text-sm text-muted-foreground">
            Descarga tus datos biométricos para compartir con profesionales de salud
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="gap-2 flex-1"
          >
            <Table className="w-4 h-4" />
            Exportar CSV
          </Button>
          <Button
            onClick={exportToPDF}
            variant="outline"
            className="gap-2 flex-1"
          >
            <FileText className="w-4 h-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>
    </Card>
  );
};
