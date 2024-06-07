import { useState, useEffect, useMemo } from "react";
import { Select, Label } from "tamagui";

interface Category {
  id: number;
  name: string;
}

interface CategorySelectProps {
  category: number | null;
  setCategory: (category: number | null) => void;
}

export default function CategorySelect({
  category,
  setCategory,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://192.168.1.20:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <Select
      value={category?.toString()}
      onValueChange={(value: string) => setCategory(Number(value))}
    >
      <Select.Trigger width={220}>
        <Select.Value placeholder="Select a category" />
      </Select.Trigger>

      <Select.Content zIndex={200000}>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            {useMemo(
              () =>
                categories.map((category, index) => (
                  <Select.Item
                    key={category.id}
                    index={index}
                    value={category.id.toString()}
                  >
                    <Select.ItemText>{category.name}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      {category.id === category.id && <div>Selected</div>}
                    </Select.ItemIndicator>
                  </Select.Item>
                )),
              [categories, category]
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        ></Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
