// SearchBar.tsx
import { InputGroup, InputRightAddon, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

interface SearchBarProps {
  onSubmit: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState<string>("");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(location);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <InputGroup size="md" className="max-w-[600px]">
          <Input
            bg="white"
            placeholder="LOCATION"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <InputRightAddon p={0} border="none">
            <Button
              type="submit"
              size="md"
              borderLeftRadius={0}
              borderRightRadius={3.3}
              _hover={{ bg: "white" }}
              _active={{
                bg: "#dddfe2",
                transform: "scale(0.98)",
                borderColor: "#bec3c9",
              }}
            >
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </form>
    </>
  );
};

export default SearchBar;
