import Layout from "@/components/Layout";

export const metadata = {
  title: "Sample App with Qiita API",
  description: "Qiita APIを使用したサンプルアプリです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
