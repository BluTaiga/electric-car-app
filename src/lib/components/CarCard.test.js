import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import CarCard from './CarCard.svelte';

// Mock car data
const mockCar = {
  name: 'Test Car',
  price: 50000,
  batterySize: 75,
  chargingSpeed: 150,
  imageName: 'test-car.jpg',
  summary: 'This is a test car summary.'
};

describe('CarCard', () => {
  it('renders correctly', async () => {
    const { getByText, getByAltText, queryByText } = render(CarCard, { props: { car: mockCar } });

    // Check if basic car information is rendered
    expect(getByText('Test Car')).toBeInTheDocument();
    expect(getByText('Price: $50,000')).toBeInTheDocument();
    expect(getByText('Battery: 75 kWh')).toBeInTheDocument();
    expect(getByText('Charging Speed: 150 kW')).toBeInTheDocument();

    // Check if the image is rendered with correct attributes
    const image = getByAltText('Test Car');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test-car.jpg');

    // Check if 'Read More' button is present
    expect(getByText('Read More')).toBeInTheDocument();

    // Expanded content should not be visible initially
    expect(queryByText('This is a test car summary.')).not.toBeInTheDocument();

    // Click 'Read More' button
    await fireEvent.click(getByText('Read More'));

    // Check if expanded content is now visible
    expect(getByText('This is a test car summary.')).toBeInTheDocument();

    // Check if button text changed to 'Read Less'
    expect(getByText('Read Less')).toBeInTheDocument();

    // Click 'Read Less' button
    await fireEvent.click(getByText('Read Less'));

    // Wait for the transition to complete (adjust the timeout as needed)
    await new Promise(resolve => setTimeout(resolve, 350));

    // // Check if expanded content is hidden again
    // expect(queryByText('This is a test car summary.')).not.toBeInTheDocument();
  });
});