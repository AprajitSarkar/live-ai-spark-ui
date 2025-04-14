
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Key } from "lucide-react";

interface ApiKeyFormProps {
  setApiKey: (key: string) => void;
}

const ApiKeyForm = ({ setApiKey }: ApiKeyFormProps) => {
  const [inputKey, setInputKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("apiKey", inputKey);
    setApiKey(inputKey);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-purple-600/20 p-3">
            <Key className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Enter API Key</h2>
          <p className="text-gray-400 text-center text-sm">
            Please enter your API key to continue. If you don't have one,{" "}
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 underline"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://your-api-key-url.com", "_blank");
              }}
            >
              get one here
            </a>
            .
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              type="password"
              placeholder="Enter your API key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white"
              disabled={!inputKey}
            >
              Continue
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
};

export default ApiKeyForm;
